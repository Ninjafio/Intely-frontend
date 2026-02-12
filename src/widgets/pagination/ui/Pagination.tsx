import '../css/Pagination.css'

export interface IPagination {
  pageSize: number;
  overallSize: number;
  pageNumber: number;
  handleOnClick: (str: string) => void;
}

const Pagination = ({ handleOnClick, pageSize, overallSize, pageNumber }: IPagination) => {
  const numbers = []

  for (let i = 1; i <= Math.ceil(overallSize / pageSize); i++) {
    numbers.push(
      <div
        className="pagination_number"
        style={{
          color: `${pageNumber === i ? 'rgba(0, 101, 152, 1)' : 'rgba(112, 112, 112, 1)'}`,
          border: `1px solid ${pageNumber === i ? 'rgba(0, 101, 152, 1)' : 'rgba(112, 112, 112, 1)'}`,
        }}
        onClick={() => handleOnClick(i.toString())}
      >
        {i}
      </div>,
    )
  }
  return (
    <div className="Pagination">
      <div
        className="Pagination_left"
        style={{
          filter: `${pageNumber > 1 ? 'brightness(0) saturate(100%) invert(17%) sepia(65%) saturate(4770%) hue-rotate(186deg) brightness(93%) contrast(101%)' : ''}`,
          border: `1px solid ${pageNumber > 1 ? 'rgba(0, 101, 152, 1)' : 'rgba(112, 112, 112, 1)'}`,
        }}
        onClick={() => handleOnClick("left")}
      >
        <img src="/left.svg" alt="Предыдущая страница" />
      </div>
      <div className="numbers_container">{numbers}</div>
      <div
        className="Pagination_right"
        style={{
          filter: `${pageNumber != Math.ceil(overallSize / pageSize) ? 'brightness(0) saturate(100%) invert(17%) sepia(65%) saturate(4770%) hue-rotate(186deg) brightness(93%) contrast(101%)' : ''}`,
          border: `1px solid ${pageNumber != Math.ceil(overallSize / pageSize) ? 'rgba(0, 101, 152, 1)' : 'rgba(112, 112, 112, 1)'}`,
        }}
        onClick={() => handleOnClick("right")}
      >
        <img src="/right.svg" alt="Следующая страница" />
      </div>
    </div>
  )
}

export default Pagination
