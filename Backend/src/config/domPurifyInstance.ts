import DOMPurify from 'dompurify';
import { JSDOM } from "jsdom";

// Create a DOMPurify instance
const window = new JSDOM("").window;
const domPurify = DOMPurify(window)

export default domPurify;