import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  setPriceBounds,
  toggleStyle,
  setDensity,
  setCurliness,
  toggleRequiresWax,
  toggleBoostsCharisma
} from '../../../app/store/filterSlice';
import { Checkbox, RadioGroup, Switch, Input, Button } from '../../../components/ui';
import arrowIcon from '../../../assets/Arrow.svg';
interface MobileFiltersProps {
  onClose: () => void;
  uniqueDensities: { value: string; label: string }[];
  uniqueCurliness: { value: string; label: string }[];
  allAvailableStyles: string[];
}
export const MobileFilters = ({
  onClose,
  uniqueDensities,
  uniqueCurliness,
  allAvailableStyles
}: MobileFiltersProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [activeScreen, setActiveScreen] = useState<'main' | 'styles'>('main');
  const defaultStyles = allAvailableStyles.slice(0, 3);
  const visibleStylesOnMain = Array.from(new Set([...defaultStyles, ...filters.styles]));
  return (
    <div className="mobile-filters-screen">
      {activeScreen === 'styles' ? (
        <>
          <div className="mobile-filters__header">
            <Button variant="text" onClick={() => setActiveScreen('main')} aria-label="Назад">
              <img src={arrowIcon} alt="" className="icon-m" />
            </Button>
            <h2 className="mobile-filters__title">Стиль</h2>
          </div>
          <div className="mobile-filters__body">
            {allAvailableStyles.map((style) => (
              <Checkbox
                key={style}
                checked={filters.styles.includes(style)}
                onCheckedChange={() => dispatch(toggleStyle(style))}
              >
                {style}
              </Checkbox>
            ))}
          </div>
          <div className="mobile-filters__footer">
            <Button onClick={() => setActiveScreen('main')} className="mobile-filters__btn-submit">
              Применить
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mobile-filters__header">
            <Button variant="text" onClick={onClose} aria-label="Назад">
              <img src={arrowIcon} alt="" className="icon-m" />
            </Button>
            <h2 className="mobile-filters__title">Фильтры</h2>
          </div>
          <div className="mobile-filters__body">
            <div className="mobile-filters__card">
              <h3 className="mobile-filters__card-title">Цена</h3>
              <div className="mobile-filters__price-row">
                <Input
                  label="От"
                  value={filters.priceFrom === 0 ? '' : filters.priceFrom.toString()}
                  placeholder="10"
                  onChange={(e) => dispatch(setPriceBounds({ from: e.target.value === '' ? 0 : Number(e.target.value) }))}
                  type="number"
                />
                <Input
                  label="до"
                  value={filters.priceTo === 999999 ? '' : filters.priceTo.toString()}
                  placeholder="1000"
                  onChange={(e) => dispatch(setPriceBounds({ to: e.target.value === '' ? 999999 : Number(e.target.value) }))}
                  type="number"
                />
              </div>
            </div>
            <div className="mobile-filters__card">
              <div className="mobile-filters__styles-row">
                <h3 className="mobile-filters__card-title">Стиль</h3>
                <Button
                  variant="text"
                  onClick={() => setActiveScreen('styles')}
                  className="mobile-filters__all-btn"
                >
                  Все <img src={arrowIcon} alt="" className="icon-s mobile-filters__arrow-right" />
                </Button>
              </div>
              <div className="mobile-filters__styles-tags">
                {visibleStylesOnMain.map((style) => {
                  const isChecked = filters.styles.includes(style);
                  const tagClasses = [
                    'mobile-filters__tag-btn',
                    isChecked ? 'mobile-filters__tag-btn_state_active' : ''
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return (
                    <Button
                      key={style}
                      onClick={() => dispatch(toggleStyle(style))}
                      className={tagClasses}
                    >
                      {style}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="mobile-filters__card">
              <h3 className="mobile-filters__card-title">Густота</h3>
              <RadioGroup
                options={uniqueDensities}
                value={filters.density}
                onValueChange={(val) => dispatch(setDensity(val))}
                name="mobile-density"
              />
            </div>
            <div className="mobile-filters__card">
              <h3 className="mobile-filters__card-title">Закрученность</h3>
              <RadioGroup
                options={uniqueCurliness}
                value={filters.curliness}
                onValueChange={(val) => dispatch(setCurliness(val))}
                name="mobile-curliness"
              />
            </div>
            <div className="mobile-filters__toggles-group">
              <div className="mobile-filters__card">
                <Switch
                  checked={filters.requiresWax}
                  onCheckedChange={() => dispatch(toggleRequiresWax())}
                >
                  требует воск
                </Switch>
              </div>
              <div className="mobile-filters__card">
                <Switch
                  checked={filters.boostsCharisma}
                  onCheckedChange={() => dispatch(toggleBoostsCharisma())}
                >
                  повышает харизму
                </Switch>
              </div>
            </div>
          </div>
          <div className="mobile-filters__footer">
            <Button onClick={onClose} className="mobile-filters__btn-submit">
              Применить фильтры
            </Button>
          </div>
        </>
      )}
    </div>
  );
};