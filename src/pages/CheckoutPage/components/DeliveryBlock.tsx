import { type ChangeEvent, useEffect } from "react";
import { useGetPickupPointsQuery } from "../../../api/baseApi";
import {
  Button,
  Input,
  Select,
  type SelectOption,
} from "../../../components/ui";

type DeliveryMethod = "courier" | "pickup_point";
type CityValue = "msk" | "spb";

const cityOptions: SelectOption<CityValue>[] = [
  { value: "msk", label: "Москва" },
  { value: "spb", label: "Санкт-Петербург" },
];

interface DeliveryBlockProps {
  method: DeliveryMethod;
  onMethodChange: (method: DeliveryMethod) => void;
  city: CityValue;
  onCityChange: (city: CityValue) => void;
  address: string;
  onAddressChange: (val: string) => void;
  addressError: string;
  pickupIndex: number;
  onPickupIndexChange: (idx: number) => void;
}

export function DeliveryBlock({
  method,
  onMethodChange,
  city,
  onCityChange,
  address,
  onAddressChange,
  addressError,
  pickupIndex,
  onPickupIndexChange,
}: DeliveryBlockProps) {
  const { data: serverPickupPoints = [], isLoading } =
    useGetPickupPointsQuery();

  const filteredPoints = serverPickupPoints.filter((point) => {
    if (city === "msk") return point.address.toLowerCase().includes("москва");
    if (city === "spb")
      return (
        point.address.toLowerCase().includes("петербург") ||
        point.address.toLowerCase().includes("спб")
      );
    return true;
  });

  useEffect(() => {
    if (method === "pickup_point" && filteredPoints.length > 0) {
      const activePoint = filteredPoints[pickupIndex] || filteredPoints[0];
      if (activePoint && address !== activePoint.address) {
        onAddressChange(activePoint.address);
      }
    }
  }, [method, city, pickupIndex, filteredPoints, onAddressChange, address]);

  const handlePointChange = (val: string) => {
    const idx = filteredPoints.findIndex((p) => p.id === val);
    if (idx !== -1) {
      onPickupIndexChange(idx);
      onAddressChange(filteredPoints[idx].address);
    }
  };

  const pointOptions = filteredPoints.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const currentPoint = filteredPoints[pickupIndex] || filteredPoints[0];

  return (
    <fieldset className="checkout-block">
      <legend className="checkout-block__title">Способ доставки</legend>
      <div className="checkout-block__tabs-grid checkout-block__tabs-grid_cols_2">
        <Button
          type="button"
          variant="tab"
          active={method === "courier"}
          onClick={() => onMethodChange("courier")}
        >
          Курьером
        </Button>
        <Button
          type="button"
          variant="tab"
          active={method === "pickup_point"}
          onClick={() => onMethodChange("pickup_point")}
        >
          В пункт выдачи
        </Button>
      </div>

      <div className="checkout-block__delivery-content">
        <span className="checkout-block__date-label">В ближайшие дни</span>

        <div className="checkout-block__city-group">
          <label className="checkout-block__field-label">Выберите город:</label>
          <Select<CityValue>
            options={cityOptions}
            value={city}
            onChange={(val) => {
              onCityChange(val);
              onPickupIndexChange(0);
            }}
          />
        </div>

        {method === "courier" ? (
          <div className="checkout-delivery-courier__fields">
            <div className="checkout-delivery-courier__input-group flex-grow w-full">
              <label className="checkout-block__field-label">
                Доставить по адресу:
              </label>
              <Input
                placeholder="улица, дом, квартира"
                value={
                  address.toLowerCase().includes("арбат") ||
                  address.toLowerCase().includes("проспект")
                    ? ""
                    : address
                }
                error={addressError}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onAddressChange(e.target.value)
                }
              />
            </div>
          </div>
        ) : (
          <div className="checkout-delivery-pickup__info-row">
            {isLoading ? (
              <div className="checkout-delivery-pickup__loading">
                Загрузка пунктов выдачи...
              </div>
            ) : filteredPoints.length > 0 ? (
              <>
                <div className="checkout-delivery-pickup__select-wrapper">
                  <label className="checkout-block__field-label">
                    Выберите пункт самовывоза:
                  </label>
                  <Select
                    options={pointOptions}
                    value={currentPoint?.id || ""}
                    onChange={handlePointChange}
                  />
                </div>
                {currentPoint && (
                  <div className="checkout-delivery-pickup__meta">
                    <p className="checkout-delivery-pickup__address">
                      {currentPoint.name} — {currentPoint.address}
                    </p>
                    <span className="checkout-delivery-pickup__hours">
                      время работы: 09:00 - 21:00
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="checkout-delivery-pickup__error">
                В данном городе нет доступных пунктов выдачи
              </div>
            )}
          </div>
        )}
      </div>
    </fieldset>
  );
}
