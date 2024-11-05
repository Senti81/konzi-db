const SupportBandList = ({ supportBands, handleDeleteSupportBand }) => {
  return (
    <div className="mt-1 mb-4 ps-2">
      {supportBands.map((band, index) => (
        <span
          key={index}
          className="badge rounded-pill bg-success-subtle text-primary-emphasis m-1 px-3 py-2"
          onClick={() => handleDeleteSupportBand(index)}
        >
          {band}
          <span className="vr mx-2" />
          <i className='bi bi-x-circle-fill' />
        </span>
      ))}
    </div>
  )
}

export default SupportBandList