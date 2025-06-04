"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async () => {
    console.log("Lambda executed");
    throw new Error("Simulated error");
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBSFMsUUFBQSxPQUFPLFdBR2hCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkxhbWJkYSBleGVjdXRlZFwiKTtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlNpbXVsYXRlZCBlcnJvclwiKTtcclxuICB9O1xyXG4gICJdfQ==