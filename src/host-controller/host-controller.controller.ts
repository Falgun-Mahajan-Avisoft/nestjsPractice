import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({path:'host-controller', host:":app.domain.com"})
export class HostControllerController {
@Get()
getHost(@HostParam("app") app:string){
return
}
}
