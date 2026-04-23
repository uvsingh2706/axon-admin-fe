import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import {
  createPointSchema,
  getPointFormSections,
  type CreatePointFormValues,
} from "../config/point.form";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { useStationList } from "../../ChargingStations/services/stations.hooks";
import { useTariffList } from "@/pages/TariffManagement/Tariff/services/tarrif.hooks";
import { useOEMList } from "../../ChargerSpecifications/OEM/services/oem.hooks";
import { useCreateChargingPoint, useModelListByOemId } from "../services/chargingpoints.hooks";

export default function PointCreate() {
  const navigate = useNavigate();
  const [selectedOemId, setSelectedOemId] = useState<string>("");
  const { data: stationData } = useStationList({ limit: 50, page: 1 });
  const { data: oemData } = useOEMList({ limit: 50, page: 1 });
  const { data: tariffData } = useTariffList({ limit: 50, page: 1 });
  const { data: modelResponse } = useModelListByOemId(selectedOemId, !!selectedOemId);
  const createPoint = useCreateChargingPoint();

  const stationOptions = stationData?.data?.data?.map((station: any) => ({
    label: station.name,
    value: station.name,
  })) || [];

  const oemOptions = oemData?.data?.oems?.map((oem: any) => ({
    label: oem.oemName,
    value: oem.oemName,
    id: oem.id,
  })) || [];

  const handleOemChange = (oemName: string) => {
    const oem = oemData?.data?.oems?.find((o: any) => o.oemName === oemName);
    if (oem) {
      setSelectedOemId(oem.id);
    } else {
      setSelectedOemId("");
    }
  };

  const modelOptions = modelResponse?.data?.chargerModels?.map((model: any) => ({
    label: model.chargerModelName,
    value: model.chargerModelName,
  })) || [];

  const tariffOptions = tariffData?.data?.tariffs?.map((tariff: any) => ({
    label: tariff.tariffName,
    value: tariff.tariffName,
  })) || [];

  const handleBack = () => {
    navigate(Pathname.ASSET_MANAGEMENT);
  };

  const handleSubmit = (data: CreatePointFormValues) => {
     console.log(data, 'datahere');
    let payload = {
      chargingPointName: data.name,
      chargingPointId: data.id,
      chargingLocation: data.station,
      oemName: data.oem,
      modelName: data.model,
      tariffName: data.tariff,
      commissionedOn: data.commissionOn,
      configurationUrl: data.configurationUrl || "",
      connectionType: data.connectionType,
      isPublished: data.isPublic,
    }

    createPoint.mutate(payload, {
      onSuccess: () => {
        handleBack();
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Points", path: Pathname.ASSET_MANAGEMENT },
          { label: "Add Charging Point" },
        ]}
      />

      <PageWrapper
        isChargerSpecifications={false}
        title="Add Charging Point"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm
            schema={createPointSchema}
            onSubmit={handleSubmit}
            sections={getPointFormSections({
              stationOptions,
              oemOptions,
              modelOptions,
              tariffOptions,
              onOemChange: handleOemChange,
              isModelDisabled: !selectedOemId,
            })}
            submitLabel="Save"
            cancelLabel="Cancel"
            onCancel={handleBack}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
