#!/usr/bin/env node

import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();



const publishToQueue = async (queue, message, durable = false) => {

    try {
    const cluster = await amqp.connect(process.env.CONNECTIONSTRING);
    const channel = await cluster.createChannel();

    await channel.assertQueue(queue, durable= false);
    await channel.sendToQueue(queue, Buffer.from(message));
  
    console.info(' [x] Sending email to queue', queue, message);
        
    } catch (error) {
        // handle error response
        console.error(error, 'Unable to connect to cluster!');  
        process.exit(1);
    }

    
}

export default publishToQueue; 