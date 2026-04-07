

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	getPaginationRowModel,
	type PaginationState,
	type Updater,
	type ColumnFiltersState,
	getFilteredRowModel,
	type Header,
	type Table as TanStackTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/component/ui/table";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/component/ui/skeleton";
import { Button } from "@/component/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronsUpDownIcon,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/component/ui/select";
import DebouncedInput from "../debounce-input";
import { Filter } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/component/ui/popover";

import { Checkbox } from "@/component/ui/checkbox";
import { Label } from "@/component/ui/label";
import { DatePicker } from "../form-date";
import { useNavigate } from "react-router-dom";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";

export type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
	filterOptions?: {
		label: string;
		value: string;
		group?: string;
		icon?: React.ReactNode;
	}[];

	multiSelect?: boolean;
};
export type ExtraFilter = {
	label: string;
	key: string;
	options: { label: string; value: string }[];
	value: string[];
	onChange?: (value: string[]) => void;
	multiSelect?: boolean;
};
export interface DataTableProps<TData, TValue> {
	columns: ExtendedColumnDef<TData, TValue>[];
	data: TData[];
	cellClassName?: string;
	headClassName?: string;
	tbodyClassName?: string;
	theadClassName?: string;
	tableWrapperClassName?: string;
	isLoading?: boolean;

	isServerPagination?: boolean;
	isServerColumnFilter?: boolean;
	isServerSort?: boolean;

	pagination?: PaginationState;
	onPaginationChange?: (updater: Updater<PaginationState>) => void;
	pageCount?: number;
	onSearchChange?: (value: string) => void;
	search?: string;
	searchPlaceholder?: string;
	isShowSearch?: boolean;
	disablePagination?: boolean;
	disabledDateFilter?: boolean;
	defaultColumnFilters?: ColumnFiltersState;
	onColumnFilterChange?: (value: ColumnFiltersState) => void;
	isLink?: boolean;
	link?: (row: TData) => string;
	onDateRangeChange?: (value: DateRange | undefined) => void;
	range?: DateRange;
	extraFilters?: ExtraFilter[];
	clearFiltersButton?: React.ReactNode;
}

function getUniqueValues<TData>(data: TData[], accessorKey: string): string[] {
	const values = new Set<string>();
	for (const row of data) {
		const value = getNestedValue(row, accessorKey);
		if (value != null) values.add(String(value));
	}
	return Array.from(values);
}

function getNestedValue<T>(obj: T, path: string): unknown {
	return path.split(".").reduce((acc: unknown, key: string) => {
		if (acc && typeof acc === "object" && key in acc) {
			return (acc as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj);
}

function ColumnActions<TData>({
	header,
	data,
	appliedColumnFilters,
	table,
	isServerColumnFilter = false,
	filterOptions,
	columnFilters,
	onColumnFilterChange,
	multiSelect = true,
}: {
	header: Header<TData, unknown>;
	data: TData[];
	appliedColumnFilters: (header: Header<TData, unknown>) => number;
	table: TanStackTable<TData>;
	isServerColumnFilter?: boolean;
	filterOptions?: ExtendedColumnDef<TData, unknown>["filterOptions"];
	columnFilters: ColumnFiltersState;
	onColumnFilterChange?: (value: ColumnFiltersState) => void;
	multiSelect?: boolean;
}) {
	const column = table.getColumn(header.column.id);
	const currentValue =
		(columnFilters.find((f) => f.id === header.column.id)?.value as string[]) ||
		[];

	const handleCheckboxChange = (value: string, checked: boolean) => {
		const newValue = checked
			? [...currentValue, value]
			: currentValue.filter((v) => v !== value);

		column?.setFilterValue(newValue.length ? newValue : undefined);

		onColumnFilterChange?.([
			...columnFilters.filter((f) => f.id !== header.column.id),
			...(newValue.length ? [{ id: header.column.id, value: newValue }] : []),
		]);
	};

	const handleSingleSelectChange = (value: string, checked: boolean) => {
		const newValue = checked ? [value] : [];
		column?.setFilterValue(newValue.length ? newValue : undefined);
		onColumnFilterChange?.([
			...columnFilters.filter((f) => f.id !== header.column.id),
			...(newValue.length ? [{ id: header.column.id, value: newValue }] : []),
		]);
	};

	const handleGroupCheckboxChange = (values: string[], checked: boolean) => {
		const newValue = checked
			? [...new Set([...currentValue, ...values])]
			: currentValue.filter((v) => !values.includes(v));

		column?.setFilterValue(newValue.length ? newValue : undefined);

		onColumnFilterChange?.([
			...columnFilters.filter((f) => f.id !== header.column.id),
			...(newValue.length ? [{ id: header.column.id, value: newValue }] : []),
		]);
	};

	return (
		<>
			{header.column.columnDef.enableSorting && (
				<ArrowUpDown sortType={header.column.getIsSorted()} />
			)}

			{header.column.columnDef.enableColumnFilter && (
				<Popover>
					<PopoverTrigger asChild>
						<Button className="text-neutral-200" variant="ghost">
							<Filter className="size-4" />
							{appliedColumnFilters(header)
								? ` (${appliedColumnFilters(header)})`
								: ""}
						</Button>
					</PopoverTrigger>

					<PopoverContent
						className={cn("cursor-pointer max-h-[250px] overflow-y-auto w-72", {
							"p-0": isServerColumnFilter,
						})}
					>
						{isServerColumnFilter ? (
							<div className="flex flex-col">
								{filterOptions?.length ? (
									Object.entries(
										Object.groupBy(filterOptions, (item) => item.group || ""),
									).map(([group, options], i, list) => {
										const groupValues = options?.map((item) => item.value);
										const isGroupChecked = groupValues?.every((v) =>
											currentValue.includes(v),
										);

										return (
											<div
												key={group || "no-group"}
												className={cn("flex flex-col gap-3 p-4", {
													"border-b border-neutral-40":
														group && i !== list.length - 1,
												})}
											>
												{group && (
													<div className="flex items-center justify-between">
														<Label
															className="capitalize cursor-pointer text-neutral-200 leading-normal"
															htmlFor={group}
														>
															{group}
														</Label>
														<Checkbox
															id={group}
															checked={isGroupChecked}
															onCheckedChange={(checked) =>
																handleGroupCheckboxChange(
																	groupValues || [],
																	!!checked,
																)
															}
														/>
													</div>
												)}

												<div className="flex flex-col gap-3 flex-1">
													{options?.map((item) => (
														<div
															key={item.value}
															className="flex items-center justify-between gap-6"
														>
															<div className="flex items-center gap-2">
																{item.icon && item.icon}
																<Label
																	className="capitalize cursor-pointer line-clamp-1 overflow-hidden leading-normal"
																	htmlFor={item.value}
																>
																	{item.label}
																</Label>
															</div>
															<Checkbox
																id={item.value}
																checked={currentValue.includes(item.value)}
																onCheckedChange={(checked) =>
																	multiSelect
																		? handleCheckboxChange(
																				item.value,
																				!!checked,
																			)
																		: handleSingleSelectChange(
																				item.value,
																				!!checked,
																			)
																}
															/>
														</div>
													))}
												</div>
											</div>
										);
									})
								) : (
									<div className="flex p-4">
										<Label className="text-center">No Options</Label>
									</div>
								)}
							</div>
						) : (
							<div className="py-1 px-2 flex flex-col gap-2">
								{getUniqueValues(data, header.column.id).map((val) => (
									<div key={val} className="flex items-center justify-between">
										<Label className="capitalize cursor-pointer" htmlFor={val}>
											{val}
										</Label>
										<Checkbox
											id={val}
											checked={currentValue.includes(val)}
											onCheckedChange={(checked) =>
												handleCheckboxChange(val, !!checked)
											}
										/>
									</div>
								))}
							</div>
						)}
					</PopoverContent>
				</Popover>
			)}
		</>
	);
}

export function DataTable<TData, TValue>({
	columns,
	data,
	cellClassName,
	headClassName,
	tbodyClassName,
	theadClassName,
	tableWrapperClassName,
	isLoading,
	isServerPagination = false,
	pagination: externalPagination,
	onPaginationChange,
	pageCount,
	search,
	onSearchChange,
	searchPlaceholder,
	isShowSearch = true,
	disabledDateFilter = true,
	disablePagination = false,
	isServerColumnFilter = false,
	defaultColumnFilters,
	onColumnFilterChange,
	onDateRangeChange,
	range,
	isLink,
	link,
	extraFilters,
	clearFiltersButton,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [internalPagination, setInternalPagination] = useState<PaginationState>(
		{
			pageIndex: 0,
			pageSize: 10,
		},
	);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!onColumnFilterChange) return;
		onColumnFilterChange(columnFilters);
	}, [columnFilters, onColumnFilterChange]);

	useEffect(() => {
		setColumnFilters(defaultColumnFilters || []);
	}, [defaultColumnFilters]);
	const appliedColumnFilters = useCallback(
		(header: Header<TData, unknown>) => {
			const filter = columnFilters.filter(
				(item) => item.id === header.column.id,
			)[0]?.value as string[];
			return filter?.length || 0;
		},
		[columnFilters],
	);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			pagination: isServerPagination ? externalPagination : internalPagination,
			columnFilters: isServerColumnFilter ? [] : columnFilters,
		},
		onSortingChange: setSorting,
		onPaginationChange: isServerPagination
			? onPaginationChange
			: setInternalPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: !isServerPagination
			? getPaginationRowModel()
			: undefined,
		manualPagination: isServerPagination,
		pageCount: isServerPagination ? pageCount : undefined,
		onColumnFiltersChange: isServerColumnFilter ? undefined : setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div className={cn("w-full", tableWrapperClassName)}>
			<div className="my-2 flex justify-between items-center md:flex-row flex-col gap-4">
				{isShowSearch && (
					<DebouncedInput
						onChange={(val) => {
							onSearchChange?.(val);
						}}
						value={search}
						placeholder={searchPlaceholder || "Search..."}
					/>
				)}

				<div className="flex gap-4 items-center">
					{extraFilters?.map((filter: ExtraFilter) =>
						filter.multiSelect ? (
							<Popover key={filter.key}>
								<PopoverTrigger asChild>
									<Button
										variant="ghost"
										className="min-w-[200px] border-2 text-black justify-between"
									>
										{filter.label}
										<ChevronsUpDownIcon size={14} />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-2">
									<div className="flex flex-col gap-2">
										{filter.options.map(
											(option: { label: string; value: string }) => {
												const checked =
													filter.value?.includes(String(option.value)) ?? false;
												return (
													<div
														key={option.value}
														className="flex items-center gap-2"
													>
														<Checkbox
															id={`${filter.key}-${option.value}`}
															checked={checked}
															onCheckedChange={(isChecked: boolean) => {
																const currentValue = Array.isArray(filter.value)
																	? filter.value
																	: [];

																const newValue: string[] = isChecked
																	? [...currentValue, option.value]
																	: currentValue.filter(
																			(v) => v !== option.value,
																		);

																(filter.onChange as (val: string[]) => void)?.(
																	newValue,
																);
															}}
														/>
														<Label
															htmlFor={`${filter.key}-${option.value}`}
															className="text-sm cursor-pointer"
														>
															{option.label}
														</Label>
													</div>
												);
											},
										)}
									</div>
								</PopoverContent>
							</Popover>
						) : (
							<Select
								key={filter.key}
								value={filter.value?.[0] ?? ""}
								onValueChange={(val) => filter.onChange?.([val])}
							>
								<SelectTrigger className="min-w-[150px]">
									{filter.label}
								</SelectTrigger>
								<SelectContent>
									{filter.options.map(
										(option: { value: string; label: string }) => (
											<SelectItem
												key={option.value}
												value={String(option.value ?? "")}
											>
												{option.label}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>
						),
					)}
					{clearFiltersButton}
				</div>
				{!disabledDateFilter && (
					<DatePicker
						value={range}
						onChange={(val) => {
							onDateRangeChange?.(val);
						}}
						type="range"
						open={open}
						setOpen={setOpen}
						placeholder="Filter by Date Range"
					/>
				)}
			</div>

			<div className="border-neutral-20 rounded-3xl border-2 overflow-hidden">
				<Table className="xl:w-full w-[1400px]">
					<TableHeader className={theadClassName}>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="" key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className={cn(
												"text-sm font-medium first:pl-6 border-0 last:pr-6 py-3 bg-neutral-10 select-none text-zinc-500",
												headClassName,
											)}
											onClick={
												header.column.columnDef.enabeSorting
													? header.column.getToggleSortingHandler()
													: undefined
											}
											style={{
												width: header.column.getSize(),
											}}
										>
											<div className="flex gap-1 items-center">
												<div>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</div>
												<ColumnActions
													table={table}
													data={data}
													appliedColumnFilters={appliedColumnFilters}
													header={header}
													isServerColumnFilter={isServerColumnFilter}
													filterOptions={
														(
															header.column.columnDef as ExtendedColumnDef<
																TData,
																TValue
															>
														).filterOptions
													}
													columnFilters={columnFilters}
													onColumnFilterChange={setColumnFilters}
													multiSelect={
														(
															header.column.columnDef as ExtendedColumnDef<
																TData,
																TValue
															>
														).multiSelect
													}
												/>
											</div>
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className={tbodyClassName}>
						{isLoading ? (
							Array.from({
								length: table.getState()?.pagination?.pageSize || 10,
							}).map((_, i) => (
								<TableRow key={i} data-state={"selected"}>
									{Array.from({ length: columns.length }).map((_, index) => (
										<TableCell
											className={cn(
												"first:pl-6 last:pr-6 p-[10px]",
												cellClassName,
											)}
											key={index}
										>
											<Skeleton className="w-full rounded h-8 bg-neutral-100 " />
										</TableCell>
									))}
								</TableRow>
							))
						) : table?.getRowModel()?.rows?.length ? (
							table?.getRowModel()?.rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={() => {
										if (isLink) {
											navigate(link?.(row.original) || "");
										}
									}}
									className={cn("hover:bg-neutral-20", {
										"cursor-pointer": isLink,
									})}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className={cn(
												"first:pl-6 last:pr-6 py-3 px-2 text-sm font-medium",
												cellClassName,
											)}
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<div className="flex flex-col items-center gap-2">
										<span className="text-4xl">📭</span>
										<span className="text-muted-foreground">No results.</span>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{!disablePagination && (
				<div className="flex items-center justify-end gap-6 py-4 w-full sm:flex-row flex-col">
					<div className="flex items-center gap-2">
						<span className="text-sm text-[#09090B] font-medium">
							Row per page
						</span>
						<Select
							value={`${table.getState()?.pagination?.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value));
							}}
						>
							<SelectTrigger className="h-8 text-[#09090B]">
								{table.getState()?.pagination?.pageSize}
							</SelectTrigger>
							<SelectContent>
								{[5, 10, 15, 20, 50, 100].map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										Show {pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<span className="text-sm text-[#09090B] font-medium">
						Page{" "}
						<strong>
							{table.getState()?.pagination?.pageIndex + 1} of{" "}
							{table.getPageCount()}
						</strong>
					</span>
					<div className="flex gap-2 items-center">
						<Button
							variant="outline"
							size="icon-sm"
							onClick={() => table.firstPage()}
							disabled={!table?.getCanPreviousPage()}
						>
							<ChevronsLeft />
						</Button>
						<Button
							variant="outline"
							size="icon-sm"
							onClick={() => table.previousPage()}
							disabled={!table?.getCanPreviousPage()}
						>
							<ChevronLeft />
						</Button>
						<Button
							variant="outline"
							size="icon-sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<ChevronRight />
						</Button>
						<Button
							variant="outline"
							size="icon-sm"
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}
						>
							<ChevronsRight />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
