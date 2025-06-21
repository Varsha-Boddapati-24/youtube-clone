
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import channelModel from "../models/channel.model.js";
import videoModel from "../models/video.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const users = [
  {
    username: "Varsha",
    email: "varshaboddapati@gmail.com",
    password: "12345678",
    channelName: "Varsha's Channel",
    channelAvatar: "https://cdn.pixabay.com/photo/2017/11/12/16/41/musician-2943109_1280.jpg",
    channelBanner: "https://cdn.pixabay.com/photo/2018/09/30/14/53/guitar-3717871_1280.jpg",
    description: "A collection of creative content by Varsha"
  },
  {
    username: "Alex",
    email: "alex.wright92@gmail.com",
    password: "12345678",
    channelName: "Alex's Arena",
    channelAvatar: "https://cdn.pixabay.com/photo/2016/11/29/06/17/audience-1867754_1280.jpg",
    channelBanner: "https://cdn.pixabay.com/photo/2016/07/27/05/31/dj-154146_1280.jpg",
    description: "Tech, music, and more curated by Alex"
  },
  {
    username: "Ryan",
    email: "ryan.jameson84@gmail.com",
    password: "12345678",
    channelName: "Ryan's World",
    channelAvatar: "https://cdn.pixabay.com/photo/2015/01/08/18/25/man-593333_1280.jpg",
    channelBanner: "https://cdn.pixabay.com/photo/2017/08/07/20/33/concert-2607740_1280.jpg",
    description: "Jazz, news, tech and more"
  }
];
const videoData=[
  {
    "title": "Acoustic Chill Session",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2017/11/12/16/41/musician-2943109_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2015/08/08/139-135737102_large.mp4",
    "description": "Relaxing acoustic guitar performance perfect for study or relaxation.",
    "category": "Music",
    "email": "varshaboddapati@gmail.com",
    "views": 51234,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "DJ Live Set 2025",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2016/11/29/06/17/audience-1867754_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2015/11/07/1275-145116912_medium.mp4",
    "description": "Non-stop high energy beats by DJ Max at the 2025 summer festival.",
    "category": "Music",
    "email": "alex.wright92@gmail.com",
    "views": 87210,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Street Jazz Performance",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2014/10/11/22/20/guitar-case-485112_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2015/08/08/48-135716440_medium.mp4",
    "description": "Soulful jazz performance recorded live on the streets of New Orleans.",
    "category": "Music",
    "email": "ryan.jameson84@gmail.com",
    "views": 65312,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Global Headlines Today",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2025/02/02/16/03/news-9377114_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2023/07/31/174030-850286635_large.mp4",
    "description": "Catch up with the latest global political, business, and technology headlines.",
    "category": "News",
    "email": "varshaboddapati@gmail.com",
    "views": 78231,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Weather Forecast 2025",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2019/02/05/20/00/anemometer-3977718_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2023/02/09/149986-797491778_large.mp4",
    "description": "This week's forecast and severe weather alerts.",
    "category": "News",
    "email": "ryan.jameson84@gmail.com",
    "views": 45231,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Urban Basketball Hoop Swish",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2022/04/09/15/10/basketball-7121617_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2024/04/18/208442_large.mp4",
    "description": "Perfect swish through the hoop in urban court.",
    "category": "Sports",
    "email": "varshaboddapati@gmail.com",
    "views": 23000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Kid Basketball 3D Cartoon Clip",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2023/02/09/09/51/basketball-7778408_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2022/12/21/143758-784138204_large.mp4",
    "description": "A fun 3D cartoon scene of a kid playing basketball—perfect for sports and gaming channels!",
    "category": "Sports",
    "email": "varshaboddapati@gmail.com",
    "views": 12000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "3D Cartoon Kid Serving Tennis Ball",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2020/11/27/18/59/tennis-5782695_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2025/02/18/259142_large.mp4",
    "description": "A cute 3D animation of a young boy serving a tennis ball — great for sports or kids' channel content!",
    "category": "Sports",
    "email": "varshaboddapati@gmail.com",
    "views": 13000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Vintage Film Strip Rolling",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2017/04/15/23/57/film-2233656_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2016/09/13/5129-183300007_large.mp4",
    "description": "Nostalgic film reel rolling in motion.",
    "category": "Movies",
    "email": "varshaboddapati@gmail.com",
    "views": 18500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Cinema Projector Starts",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2021/11/12/00/53/movie-projector-6787644_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2016/07/27/4050-176748994_large.mp4",
    "description": "Classic theater projector beam illuminates screen.",
    "category": "Movies",
    "email": "alex.wright92@gmail.com",
    "views": 19500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Film Countdown Countdown",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2019/05/23/12/57/clipper-4223871_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2023/01/01/144961-785579148_large.mp4",
    "description": "Old-school film countdown animation to start the show.",
    "category": "Movies",
    "email": "ryan.jameson84@gmail.com",
    "views": 17500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Focused Classroom Environment",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2014/06/26/12/04/students-377789_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2024/06/06/215475_tiny.mp4",
    "description": "Students engaged in a focused lesson.",
    "category": "Education",
    "email": "varshaboddapati@gmail.com",
    "views": 14500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Pages Flipping in a Book",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2019/12/18/13/56/glasses-4704055_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2021/08/05/84006-584870923_large.mp4",
    "description": "Turning pages close-up in a literature book.",
    "category": "Education",
    "email": "alex.wright92@gmail.com",
    "views": 13500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Teacher in Classroom Teaching",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2019/02/10/09/21/lecture-3986809_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2016/05/12/3161-166338902_large.mp4",
    "description": "Teacher lectures students on whiteboard.",
    "category": "Education",
    "email": "ryan.jameson84@gmail.com",
    "views": 12500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Rapid Scrolling Code",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2019/05/06/23355-334950213_large.mp4",
    "description": "Lines of code scroll quickly on an IDE screen.",
    "category": "Coding",
    "email": "varshaboddapati@gmail.com",
    "views": 16500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Typing Code on Keyboard",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2019/10/23/14/08/keyboard-4571732_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2015/12/11/1656-148614494_medium.mp4",
    "description": "Close-up of hands typing code on keyboard.",
    "category": "Coding",
    "email": "alex.wright92@gmail.com",
    "views": 21000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Digital Code Glitch",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2016/09/23/08/28/code-1689066_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2019/10/09/27706-365890968_tiny.mp4",
    "description": "Glitchy digit stream representing code flow.",
    "category": "Coding",
    "email": "ryan.jameson84@gmail.com",
    "views": 19500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Cartoon Wildlife Dance Mix",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2014/10/31/17/41/dancing-dave-minion-510835_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2021/05/28/75617-556482746_large.mp4",
    "description": "A whimsical 3D cartoon mix of a bear, mouse, rabbits & raccoon dancing together—great for fun animal content!",
    "category": "Comedy",
    "email": "varshaboddapati@gmail.com",
    "views": 15000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Short Circus Clown Animation",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2022/01/09/15/15/clown-6926214_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2019/10/09/27683-365460611_large.mp4",
    "description": "Enjoy a quick circus clown animation—colorful, cheerful, and full of fun!",
    "category": "Comedy",
    "email": "ryan.jameson84@gmail.com",
    "views": 19800,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Robot Arm Assembly Line",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2017/12/10/10/54/robot-3009602_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2021/09/11/88223-606079076_large.mp4",
    "description": "Automated robot arm working in factory.",
    "category": "Technology",
    "email": "varshaboddapati@gmail.com",
    "views": 23500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Cyborg Android Showcase",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2020/05/12/19/26/man-5164636_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2024/08/13/226315_large.mp4",
    "description": "Futuristic cyborg android model display.",
    "category": "Technology",
    "email": "alex.wright92@gmail.com",
    "views": 22000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "AI Robot Dance Clip",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2017/08/30/16/16/robot-2697683_1280.png",
    "videoUrl": "https://cdn.pixabay.com/video/2023/03/07/153609-805688859_tiny.mp4",
    "description": "Robot dancing with AI-powered movements.",
    "category": "Technology",
    "email": "ryan.jameson84@gmail.com",
    "views": 21000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Sunrise Yoga Session",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2016/11/18/15/05/beach-1835213_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2022/12/18/143436-782373975_large.mp4",
    "description": "Gentle yoga routine at sunrise.",
    "category": "Health",
    "email": "varshaboddapati@gmail.com",
    "views": 21500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Beachside Jogging Workout",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2020/03/23/17/14/run-4961494_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2019/11/21/29331-374868343_large.mp4",
    "description": "Energizing jog along the beach coastline.",
    "category": "Health",
    "email": "alex.wright92@gmail.com",
    "views": 20500,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Pushups Fitness Drill",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2019/11/05/16/55/pushups-4603956_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2022/12/18/143431-782373969_large.mp4",
    "description": "Intense pushup routine for strength.",
    "category": "Health",
    "email": "ryan.jameson84@gmail.com",
    "views": 20000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Grilling Steak on BBQ",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2013/06/09/06/07/meat-123668_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2022/07/20/124829-732633113_large.mp4",
    "description": "Sizzling steak on the barbecue grill.",
    "category": "Food",
    "email": "varshaboddapati@gmail.com",
    "views": 24000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Snack Time: Popcorn Popping",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2015/03/31/19/03/popcorn-701450_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2020/04/28/37441-414024639_large.mp4",
    "description": "Quick 27‑second clip of popcorn popping – snack vibes!",
    "category": "Food",
    "email": "alex.wright92@gmail.com",
    "views": 16000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Fresh Salad Tossing",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2022/02/09/17/53/salad-7003903_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2021/04/15/71125-537986747_large.mp4",
    "description": "Healthy salad tossed with fresh veggies.",
    "category": "Food",
    "email": "ryan.jameson84@gmail.com",
    "views": 20000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "PlayStation Controller in Action",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2017/08/10/07/29/sony-2619483_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2019/09/06/26619-359604050_large.mp4",
    "description": "Close-up of thumbs navigating a PlayStation controller—capture the gamer vibe!",
    "category": "Gaming",
    "email": "varshaboddapati@gmail.com",
    "views": 15000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Up-Close Gaming Controller Action",
    "thumbnailUrl": "https://cdn.pixabay.com/photo/2016/11/21/15/08/playstation-1845880_1280.jpg",
    "videoUrl": "https://cdn.pixabay.com/video/2021/07/25/82663-580974605_large.mp4",
    "description": "High-energy close-up of thumbs pressing buttons on a game controller—perfect for showcasing gamer intensity!",
    "category": "Gaming",
    "email": "varshaboddapati@gmail.com",
    "views": 15500,
    "likes": [],
    "dislikes": []
  }
]



 const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" Connected to MongoDB");

    // Cleanup
    await userModel.deleteMany();
    await channelModel.deleteMany();
    await videoModel.deleteMany();

    // Step 1: Create Users
    const createdUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await userModel.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });
      return { ...user, _id: newUser._id };
    }));

    // Step 2: Create Channels
    const createdChannels = await Promise.all(createdUsers.map(async (user) => {
      const newChannel = await channelModel.create({
        channelName: user.channelName,
        channelAvatar: user.channelAvatar,
        channelBanner: user.channelBanner,
        description: user.description,
        owner: user._id,
      });
      await userModel.findByIdAndUpdate(user._id, { channel: newChannel._id });
      return { email: user.email, channelId: newChannel._id, userId: user._id };
    }));

    // Step 3: Create Videos (email -> channel & uploader)
    const videoDocs = videoData.map(video => {
      const owner = createdChannels.find(u => u.email === video.email);
      return {
        ...video,
        uploader: owner.userId,
        channelId: owner.channelId,
      };
    });

    await videoModel.insertMany(videoDocs);
    console.log(" All users, channels, and videos seeded successfully!");

  } catch (err) {
    console.error(" Seeding failed:", err.message);
  
  }
};


export default seed;
