import './css/FilterTopBar.css'
import { useUnit } from 'effector-react'
import { $topBarFiltersValues, setTopBarFiltersValues } from '../../../store/index'

interface IFilterTopBar {
  brands: readonly string[]
}

interface IBrandsOptions {
  options: readonly string[]
}

const Options = ({ options }: IBrandsOptions) => {
  return (
    <>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </>
  )
}

const FilterTopBar = ({ brands }: IFilterTopBar) => {
  const topBarFiltersValues = useUnit($topBarFiltersValues)

  const handleReset = () => {
    setTopBarFiltersValues({
      brand: '',
      model: '',
      year: '',
      engine: '',
    })
  }

  return (
    <div className="FilterTopBar">
      <h2>Подбор запчасти для автомобиля:</h2>
      <div className="options__wrapper">
        <select
          name="brand"
          id="brand"
          value={topBarFiltersValues.brand}
          onChange={(e) => setTopBarFiltersValues({ ...topBarFiltersValues, brand: e.target.value.toString() })}
        >
          <option value="" selected disabled hidden>
            Марка
          </option>
          {<Options options={brands} />}
        </select>
        <select
          name="model"
          id="model"
          value={topBarFiltersValues.model}
          disabled={topBarFiltersValues.brand !== '' ? false : true}
          onChange={(e) => setTopBarFiltersValues({ ...topBarFiltersValues, model: e.target.value.toString() })}
        >
          <option value="" selected disabled hidden>
            Модель
          </option>
          <option value="500">Abarth 500</option>
          <option value="595">Abarth 595</option>
          <option value="695">Abarth 695</option>
          <option value="PuntoEvo">Abarth Punto Evo</option>
          <option value="500e">Abarth 500e</option>
        </select>
        <select
          name="year"
          id="year"
          value={topBarFiltersValues.year}
          disabled={topBarFiltersValues.model !== '' ? false : true}
          onChange={(e) => setTopBarFiltersValues({ ...topBarFiltersValues, year: e.target.value.toString() })}
        >
          <option value="" selected disabled hidden>
            Год выпуска
          </option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
        </select>
        <select
          name="engine"
          id="engine"
          value={topBarFiltersValues.engine}
          disabled={topBarFiltersValues.year !== '' ? false : true}
          onChange={(e) => setTopBarFiltersValues({ ...topBarFiltersValues, engine: e.target.value.toString() })}
        >
          <option value="" selected disabled hidden>
            Объём двигателя
          </option>
          <option value="1.4">1.4</option>
          <option value="1.8">1.8</option>
          <option value="2.6">2.6</option>
        </select>
        <div className="filter-btns__wrapper">
          <button type="submit" className="FilterTopBar__btn prm">
            Применить
          </button>
          <button type="submit" className="FilterTopBar__btn sec" onClick={handleReset}>
            Сбросить
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterTopBar
