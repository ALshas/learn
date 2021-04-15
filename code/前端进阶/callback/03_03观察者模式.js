/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2020-12-29 18:21:35
 * @Date: 2020-12-29 18:10:38
 */
// 发布订阅和观察者模式的区别
// 发布和订阅没有关系
// 观察者和被观察者有关系
// 观察者模式包括发布订阅
// 发布订阅不包括观察者模式
class Subject{  //被观察者
  constructor(name){
      this.name = name
      this.observer = []
      this.state = '今天开心'
  }
  attach(staff){
      this.observer.push(staff)
  }
  setState(newState){
    this.state = newState
    this.observer.forEach(staff=>staff.update(this))
  }
}
class Observer{  //观察者
    constructor(name){
        this.name = name
    }
    update(boss){
      console.log(this.name + '发现了' + boss.name + boss.state)
    }
}

let boss = new Subject('老板')
let staff1 = new Observer('员工1')
let staff2 = new Observer('员工2')
boss.attach(staff1)
boss.attach(staff2)
boss.setState('今天不开心')
boss.setState('今天开心')