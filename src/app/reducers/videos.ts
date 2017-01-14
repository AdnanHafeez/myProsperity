import { normalize, schema } from 'normalizr';

const videoSchema = new schema.Entity('videos');
const categorySchema = new schema.Entity('Categories');


videoSchema.define({
	category: categorySchema
});

const videoListSchema = new schema.Array(videoSchema);

/* 
* The data below could come from a rest server
*/
export const apiVideos = [
	{
		id: 1,
	    img: require('../../images/1041122098001_1125568113001_vs-1125552576001.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1125568112001_Anger---01-Anger-Compilation.mp4',
	    title: 'Anger Compilation',
	    author: 'T2',	
	    url: '',
	    featured: true,
		category: {
			id: 1,
			name: 'Featured'
		}
	},
	{
		id: 2,
	    img: require('../../images/1041122098001_1125553007001_vs-1125547370001.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1125553006001_Anger---02-Frustration-with-work.mp4',
	    title: 'Frustration with Work',
	    author: 'T2',
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 1,
			name: 'Featured'
		}
	},
	{
		id: 3,
	    img: require('../../images/1041122098001_1125552435001_vs-1125542562001.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1125552434001_Anger---03-Resentment-that-can-occur.mp4',
	    title: 'Resentment',
	    author: 'T2',	
	    url: 'https://google.com',
		category: {
			id: 2,
			name: 'Popular'
		}
	},
	
	{
		id: 4,
	    img: require('../../images/1041122098001_1125551881001_vs-1125543458001.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1125551880001_Anger---04-Challenges-of-discrimianting.mp4',
	    title: 'Challenges of Discriminating',
	    author: 'T2',	
	    url: '',
	    featured: false,
		category: {
			id: 2,
			name: 'Popular'
		}
	},
	{
    id: 5,
    img: require('../../images/1041122098001_1125547131001_vs-1125537822001.jpg'),
    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1125546827001_Anger---05-AaronSiebert.mp4',
    title: 'Aaron Siebert',
    author: 'T2',
    url: 'https://google.com',
    featured: false,
    category: {
      id: 2,
      name: 'Popular'
    }
	},
	{
    id: 6,
    img: require('../../images/1041122098001_1125546595001_vs-1125542518001.jpg'),
    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1125546594001_Anger---06-RobinSiebert.mp4',
    title: 'Robin Siebert',
    author: 'T2',
    url: 'https://google.com',
    featured: false,
    category: {
      id: 2,
      name: 'Popular'
    }
	}
];


const appTree = {
	videos: apiVideos
}

/*
* normalize function will flatten hierarchical/nested data which is 
* the recommended way to handle data with redux
* see https://github.com/paularmstrong/normalizr
* see http://stackoverflow.com/questions/32135779/updating-nested-data-in-redux-store    (scroll to dan abramov's answer)
*/
export const videoItems = normalize(appTree.videos, videoListSchema);

export const videoIds = (state = videoItems.result , action) => {
	return state;
};

export const videos = (state = videoItems.entities.videos, action) => {
	return state;
}

