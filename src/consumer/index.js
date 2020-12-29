#!/usr/bin/env node

import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();



const consumeFromQueue = async (queue, isNoAck = false, durable = false, prefetch = null) => {

    const cluster = await amqp.connect(process.env.CONNECTIONSTRING);
    const channel = await cluster.createChannel();

    await channel.assertQueue(queue, durable=false);

    if (prefetch) {
        channel.prefetch(prefetch);
    }

    console.log(` [x] Waiting for emails in ${queue}. To exit press CTRL+C`)
   
    try {
        channel.consume(queue, message => {
      if (message !== null) {
        console.log(' [x] Received', JSON.parse(message.content.toString()));
        channel.ack(message);
        return null;
      } else {
        console.log(error, 'Queue is empty!')
        channel.reject(message);
      }
    }, {noAck: isNoAck})
    } catch (error) {
        console.log(error, 'Failed to consume messages from Queue!')
        cluster.close(); 
    }
}

consumeFromQueue(process.env.QUEUE);
