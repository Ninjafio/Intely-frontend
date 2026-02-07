import { useMemo } from 'react'
import type { BrandName } from '@pages/catalog/config/brands';
import "../css/Brands.css"

const groupBrandsByLetter = (brands: readonly BrandName[]) => {
  return brands.reduce((acc, brand) => {
    const firstLetter = brand.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {} as Record<string, BrandName[]>);
};

const Brands: React.FC<{ brands: readonly BrandName[] }> = ({ brands }) => {
    const groupedBrands = useMemo(() => groupBrandsByLetter(brands), [brands]);
  const sortedLetters = Object.keys(groupedBrands).sort();

  return (
    <div className="car-brands__wrapper">
    <div className="car-brands-container">
      <h2>Марки автомобилей</h2>
      <div className="brands-grid">
        {sortedLetters.map((letter) => (
          <div key={letter} className="brand-group">
            <h2 className="group-letter">{letter}</h2>
            <ul className="brand-list">
              {groupedBrands[letter].map((brand) => (
                <li key={brand} className="brand-item">
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Brands;
