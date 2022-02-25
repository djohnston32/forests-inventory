import "./ForestCard.css";

function ForestCard(props) {
  return (
    <div>
      <p>{props.forest.name}</p>
      <p>{props.forest.image_url}</p>
      <p>Type: {props.forest.type}</p>
      <p>{props.forest.short_description}</p>
    </div>
  );
}

export default ForestCard;
