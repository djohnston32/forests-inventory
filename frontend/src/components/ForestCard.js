import "./ForestCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function ForestCard(props) {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.forest.image_url}
          alt={props.forest.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            <p>{props.forest.name}</p>
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
