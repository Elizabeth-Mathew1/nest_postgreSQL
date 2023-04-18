import { SetMetadata } from "@nestjs/common"

export const IS_PUBLIC_KEY = 'IsPublic' // key of SetMetadata
export function isPublic() 
{
    return SetMetadata(IS_PUBLIC_KEY,true) 
}

