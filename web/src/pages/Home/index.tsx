import React from 'react';
import img from '@/assets/bjt.png';
import { Button } from 'antd';

const Home = () => {
    return <div>
        <Button>Home</Button>
        <br />
        <img src={img} style={{ width: '200px' }} />
    </div>
};

export default Home;