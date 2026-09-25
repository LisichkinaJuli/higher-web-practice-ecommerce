import { type ChangeEvent } from "react";
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

const pickupPointsMock = [
  {
    id: "5a6b7c8d-9e0f-4a1b-8c2d-3e4f5a9c8001",
    name: "Пункт выдачи №1",
    address: "Москва, Арбат 12",
    workHours: "09:00 - 21:00",
  },
  {
    id: "6b7c8d9e-0f1a-4b2c-8d3e-4f5a6b0d8002",
    name: "Пункт выдачи №2",
    address: "Москва, улица Ленина 45",
    workHours: "10:00 - 22:00",
  },
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
        <span className="checkout-block__date-label">
          Доставят 30 февраля 2025 г.
        </span>

        {method === "courier" ? (
          <div className="checkout-delivery-courier__fields">
            <div className="checkout-delivery-courier__select-group">
              <label className="checkout-block__field-label">
                Доставить по адресу:
              </label>
              <Select<CityValue>
                options={cityOptions}
                value={city}
                onChange={onCityChange}
              />
            </div>
            <div className="checkout-delivery-courier__input-group flex-grow w-full">
              <Input
                placeholder="улица, дом, квартира"
                value={address}
                error={addressError}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onAddressChange(e.target.value)
                }
              />
            </div>
          </div>
        ) : (
          <div className="checkout-delivery-pickup__info-row">
            <Button
              type="button"
              variant="default"
              colorVariant="secondary"
              onClick={() => onPickupIndexChange(pickupIndex === 0 ? 1 : 0)}
              className="checkout-delivery-pickup__map-btn"
            >
              Выбрать на карте
            </Button>
            <div className="checkout-delivery-pickup__meta">
              <p className="checkout-delivery-pickup__address">
                {pickupPointsMock[pickupIndex].name} —{" "}
                {pickupPointsMock[pickupIndex].address}
              </p>
              <span className="checkout-delivery-pickup__hours">
                время работы: {pickupPointsMock[pickupIndex].workHours}
              </span>
            </div>
          </div>
        )}
      </div>
    </fieldset>
  );
}
