import Image from "next/image"
import Link from "next/link"

import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import FavoriteIcon from "@mui/icons-material/Favorite"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"

//a simple date formatting function
function dateFormat(inputDate, format) {
  //parse the input date
  const date = new Date(inputDate)

  //extract the parts of the date
  const day = date.getDate()

  const year = date.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // document.write("The current month is " + monthNames[d.getMonth()]);
  const month = monthNames[date.getMonth()]

  //replace the month
  format = format.replace("MM", month.toString().padStart(2, "0"))

  //replace the year
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString())
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2))
  }

  //replace the day
  format = format.replace("dd", day.toString().padStart(2, "0"))

  return format
}

const ResultCard = ({ props }) => {
  // console.log('Converted date: '+ dateFormat('2021-12-10', 'MM-dd-yyyy'));
  {
    /* <Image
          className="w-full"
          src={img_link}
          alt="Sunset in the mountains"
          layout="fill"
          objectFit="contain"
        /> */
  }
  return (
    <Link href={`/result/${props.id}`}>
      <div className="max-w-sm overflow-hidden transition-transform bg-gray-100 rounded shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105">
        <div className="w-full pl-3">
          <h3>Reasons</h3>
          {props.reasons.map((reason, idx) => {
            return (
              <div key={idx} className="w-full text-xs">
                {reason.reason}
              </div>
            )
          })}
        </div>
        <div className="relative w-full px-6 pt-4 pb-2 h-80">
          <Image
            className="w-full h-full m-auto mt-4"
            src={props.img_link}
            alt={props.headline}
            layout="fill"
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 font-bold text-gray-700 text-s">
            <a href={props.advertiser.fb_page}>{props.website}</a>
          </div>
          <div className="mb-2 text-xl font-italic">
            <a href={props.advertiser.fb_page}>{props.headline}</a>
          </div>

          <div className="mb-2 text-lg font-bold">
            <a href={props.advertiser.fb_page}>{props.advertiser.name}</a>
          </div>
          <p className="text-base text-gray-700">{props.title}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {props.likes ? (
            <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-400 rounded-full">
              <ThumbUpIcon className="text-blue-600" />
              <FavoriteIcon className="text-red-600" />
              <EmojiEmotionsIcon className="text-yellow-400 " />
              <span className="pl-3">{props.likes}</span>
            </span>
          ) : null}
          {props.comments ? (
            <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-400 rounded-full">
              {props.comments}
            </span>
          ) : null}

          {props.shares ? (
            <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-400 rounded-full">
              {props.shares}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
    // <Card className="relative">
    //   <CardHeader
    //     avatar={
    //       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
    //         R
    //       </Avatar>
    //     }
    //     action={
    //       <IconButton aria-label="settings">
    //         <MoreVertIcon />
    //       </IconButton>
    //     }
    //     title={advertiser.name}
    //     subheader={dateFormat(updated_at, "MM dd, yyyy")}
    //   />
    //   <Image
    //     src={img_link}
    //     alt="Sunset in the mountains"
    //     layout="fill"
    //     objectFit="contain"
    //   />

    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       {props.title}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton aria-label="add to favorites">
    //       <FavoriteIcon />
    //     </IconButton>
    //   </CardActions>
    // </Card>
  )
}

export default ResultCard
