import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./ForestCard.css";

function ForestCard(props) {
  const navigate = useNavigate();

  const goToDetailPage = (forest_id) => {
    navigate(`/forests/${forest_id}`);
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea
        onClick={() => {
          goToDetailPage(props.forest.id);
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.forest.image_url}
          alt={props.forest.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {props.forest.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {props.forest.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.forest.short_description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ForestCard;
