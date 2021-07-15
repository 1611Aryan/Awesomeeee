const SIZE_FIELD: React.FC = () => {
  return (
    <div>
      <label htmlFor="size">Size:</label>
      <input type="range" min="0" max="10" step="5" />
    </div>
  )
}

export default SIZE_FIELD
