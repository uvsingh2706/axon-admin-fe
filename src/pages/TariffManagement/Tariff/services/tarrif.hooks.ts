import { useQuery } from "@tanstack/react-query";
import { tariffApi } from "./tarrif.api";

import type {TariffListParams}  from "./tarrif.types";


export const tariffKeys = {
    all: ["tariff"] as const,
    list: () => [...tariffKeys.all, "list"] as const,
    listParams: (params: TariffListParams) => [...tariffKeys.list(), params] as const,
}
    

export const useTariffList = (params: TariffListParams) => {
    return useQuery({
        queryKey: tariffKeys.listParams(params),
        queryFn: () => tariffApi.getTariffList(params),
    })
}