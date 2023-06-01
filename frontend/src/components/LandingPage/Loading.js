import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
    return (
        <div className="loading-animation">
            <Skeleton
                width='330px'
                height='300px'
                style={{ borderRadius: '12px' }}
            />
        </div>
    );
}

export default Loading