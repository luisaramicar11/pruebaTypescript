export function colorQuality(qualityPercentage: number):string{
    let color:string="";
    
    if(qualityPercentage >= 5){
        color= "#F53107";
    }else{
        color= "#27B123"
    }
    console.log(color)
    return color;
}