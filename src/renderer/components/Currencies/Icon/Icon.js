const baseSize = {
  width: 20,
  height: 15,
};

const url = "https://flagcdn.com";

const Icon = ({ countryId }) => {
  if (!countryId)
    return <img width={baseSize.width} height={baseSize.height} alt="" />;
  return (
    <img
      src={`${url}/${baseSize.width}x${baseSize.height}/${countryId}.png`}
      width={baseSize.width}
      height={baseSize.height}
      alt=""
    />
    //TODO: В ALT необходимо добавить название страны
  );
};

export default Icon;
