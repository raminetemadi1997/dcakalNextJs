import React, { Fragment } from 'react';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
const VideoCustom = ({ data = [], title = null, source = '', poster = '' }) => {
    

    return (
        <section className='mb-12 flex justify-center'>
            <div className='sm:w-4/5'>
                {
                    title &&
                    <div className='mb-4 flex items-center gap-2'>
                        <SlowMotionVideoIcon fontSize="large" />
                        <p className='font-bold sm:text-base text-sm'>{title}</p>
                    </div>
                }

                {data.length > 0 ?
                    (
                        data.map((video , i) => (
                            <Fragment key={video.id} >
                                <video width="1900" height="500" controls poster={video.poster} className='rounded-lg' >
                                    <source src={video.video_path} type="video/mp4" />
                                </video>
                                {video.data_structure &&
                                    <script
                                        type="application/ld+json"
                                        dangerouslySetInnerHTML={{ __html: video.data_structure }}
                                    />
                                }
                            </Fragment>

                        ))
                    )
                    :
                    (
                        <video width="1900" height="500" controls poster={poster} className='rounded-lg' >
                            <source src={source} type="video/mp4" />
                        </video>
                    )
                }
            </div>


        </section >


    );
};

export default VideoCustom;