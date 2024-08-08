export function colorQuality(qualityPercentage: number):string{
    let color:string="";
    
    if(qualityPercentage >= 95){
        color= "#27B123"
    }else{
        color= "#F53107";
    }
    console.log(color)
    return color;
}