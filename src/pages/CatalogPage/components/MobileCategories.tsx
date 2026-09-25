import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { setCategory, setSubcategory } from '../../../app/store/filterSlice';
import { getCategoriesTree } from '../../../utils/filterProducts';
import type { Product } from '../../../types/product';
import ArrowIcon from '../../../assets/Arrow.svg';
import ArrowCatIcon from '../../../assets/Arrow_cat.svg';

type Step = 'root' | 'categories' | 'subcategories';

interface MobileCategoriesProps {
  products: Product[];
  onComplete: () => void;
}

export const MobileCategories = ({ products, onComplete }: MobileCategoriesProps) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>('root');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoriesData = getCategoriesTree(products);

  const handleBack = () => {
    if (step === 'subcategories') setStep('categories');
    else if (step === 'categories') setStep('root');
  };

  const handleSelectRoot = () => {
    setStep('categories');
  };

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    dispatch(setCategory(cat));
    setStep('subcategories');
  };

  const handleSelectSubcategory = (subcat: string) => {
    dispatch(setSubcategory(subcat));
    onComplete();
  };

  return (
    <div className="mobile-categories">
      {step !== 'root' && (
        <div className="mobile-categories__header">
          <button className="mobile-categories__back-button" onClick={handleBack}>
            <img src={ArrowIcon} alt="Назад" className="mobile-categories__back-icon" />
          </button>
          <h2 className="mobile-categories__title">
            {step === 'categories' ? 'Усы' : activeCategory}
          </h2>
        </div>
      )}

      <div className="mobile-categories__list">
        {step === 'root' && (
          <button className="mobile-categories__item" onClick={handleSelectRoot}>
            <span className="mobile-categories__text">Усы</span>
            <img src={ArrowCatIcon} alt="Перейти" className="mobile-categories__arrow" />
          </button>
        )}

        {step === 'categories' &&
          Object.keys(categoriesData).map((cat) => (
            <button 
              key={cat} 
              className="mobile-categories__item" 
              onClick={() => handleSelectCategory(cat)}
            >
              <span className="mobile-categories__text">{cat}</span>
              <img src={ArrowCatIcon} alt="Перейти" className="mobile-categories__arrow" />
            </button>
          ))}

        {step === 'subcategories' &&
          activeCategory &&
          categoriesData[activeCategory]?.map((subcat) => (
            <button 
              key={subcat} 
              className="mobile-categories__item" 
              onClick={() => handleSelectSubcategory(subcat)}
            >
              <span className="mobile-categories__text">{subcat}</span>
              <img src={ArrowCatIcon} alt="Выбрать" className="mobile-categories__arrow" />
            </button>
          ))}
      </div>
    </div>
  );
};
