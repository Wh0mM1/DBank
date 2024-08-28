import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";
//canistor is just like containers in docker
// this is just like class(canistor)


actor DBank{
  stable var currentValue:Float=100;
  // currentValue:=100;

  // Debug.print(debug_show(id));

  stable var startTime=Time.now();

  Debug.print(debug_show(startTime));

  public func topUp(amount:Float){
    currentValue+=amount;
    Debug.print(debug_show(currentValue));
  };

  public func bottomDown(amount:Float){
    let tempAmount:Float=currentValue-amount;
    if(tempAmount>=0)
    {
      currentValue-=amount;
      Debug.print(debug_show(currentValue));
    }
    else
    {
      Debug.print("Amount is greater than current amount");
    }
  };

  public query func checkValue ():async Float{
    return currentValue;
  };


  public func compound(){
    let currentTime=Time.now();
    let timeElapsedNS=currentTime-startTime;
    let timeElapsedS=timeElapsedNS/1000000000;
    currentValue:=currentValue*(1.01 ** Float.fromInt(timeElapsedS));
    startTime:=currentTime;
  }
}