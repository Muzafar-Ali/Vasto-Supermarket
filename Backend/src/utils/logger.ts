import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import 'winston-mongodb'; // Import the MongoDB transport
import config from '../config/confiq.js';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let msg = `${timestamp} ${level}: ${message}\n`;
  if (stack) {
    msg += `Stack: ${stack}\n`;
  }
  if (metadata && Object.keys(metadata).length) {
    msg += `Metadata: ${JSON.stringify(metadata, null, 2)}\n`;
  }
  return msg;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'stack'] }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat)
    }),
    // new DailyRotateFile({
    //   filename: 'logs/application-%DATE%.log',
    //   datePattern: 'YYYY-MM-DD',
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    //   format: combine(
    //     timestamp(),
    //     errors({ stack: true }),
    //     winston.format.json()
    //   )
    // }),
    
    // Add MongoDB transport
    new winston.transports.MongoDB({
      level: 'info', // Log level to store in MongoDB
      db: config.mongoURI as string, // MongoDB connection string
      options: {
        useUnifiedTopology: true
      },
      collection: 'logs', // Collection name
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      metaKey: 'metadata', // Key under which metadata will be stored
      capped: true, // Use capped collection
      cappedSize: 10000000, // 10MB capped size
      cappedMax: 1000 // Max number of documents
    })
  ]
});

export { logger };