export class PubSub {

  private topics: { [id: string] : PubSubTopic; } = {};
  
  private constructor(){ 
  }

  public static subscribe(topic: string, listener:(args: any) => void) : void {
    this.getInstance().subscribeToTopic(topic, listener);
  }

  public static publish(topic: string, arg: any) : void {
      this.getInstance().publishToTopic(topic, arg);
  }

  private static getInstance() : PubSub {
    if(!(<any>window).PubSub) {
      (<any>window).PubSub = new PubSub();
    }
    return (<any>window).PubSub;
  }

  private subscribeToTopic(topic: string, listener:(args: any) => void): void {
    this.getTopic(topic).subscribe(listener);
  }

  public publishToTopic(topic: string, arg: any) : void {
    this.getTopic(topic).notify(arg);
  }

  private getTopic(name: string): PubSubTopic {
    if(!this.topics.hasOwnProperty(name)) {
      this.topics[name] = new PubSubTopic();
    }
        
    return this.topics[name];
  }
}

class PubSubTopic {
    
  public subscriptions: ((arg: object) => void)[];

  private _lastArg: object | null; 

  constructor(){
    this.subscriptions = [];
    this._lastArg = null;
  }

  public subscribe(func:(arg: object) => void) {
    this.subscriptions.push(func);

    if(this._lastArg) {
        func(this._lastArg);
    }
  }

  public notify(arg: object) : void {
    this._lastArg = arg;
    this.subscriptions.forEach((subscription) => {
      subscription(arg);
    });
  }
}