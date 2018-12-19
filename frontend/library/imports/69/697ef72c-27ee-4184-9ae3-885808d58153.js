"use strict";
cc._RF.push(module, '697efcsJ+5BhJrjiFgI1YFT', 'TreasurePickedUpAnim');
// scripts/TreasurePickedUpAnim.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {
    pickedUpAnimNode: {
      type: cc.Node,
      default: null
    },
    durationMillis: {
      default: 0
    },
    binglingAnimNode: {
      type: cc.Node,
      default: null
    },
    binglingAnimDurationMillis: {
      default: 0
    }
  },

  binglingAnimFinish: function binglingAnimFinish() {
    this.node.destroy();
  },


  // LIFE-CYCLE CALLBACKS:
  update: function update(dt) {
    var changingNode = this.pickedUpAnimNode;
    var elapsedMillis = Date.now() - this.startedAtMillis;
    if (elapsedMillis > this.binglingAnimDurationMillis && this.binglingAnimNode.active) {
      this.binglingAnimNode.active = false;
    }
    if (elapsedMillis > this.durationMillis) {
      this.node.destroy();
      return;
    }
    if (elapsedMillis <= this.firstDurationMillis) {
      var posDiff = cc.v2(0, dt * this.yIncreaseSpeed);
      changingNode.setPosition(changingNode.position.add(posDiff));
      changingNode.scale += this.scaleIncreaseSpeed * dt;
    } else {
      var _posDiff = cc.v2(dt * this.xIncreaseSpeed, -1 * dt * this.yDecreaseSpeed);
      changingNode.setPosition(changingNode.position.add(_posDiff));
      changingNode.opacity -= dt * this.opacityDegradeSpeed;
    }
  },
  onLoad: function onLoad() {
    this.pickedUpAnimNode.scale = 0;
    this.startedAtMillis = Date.now();

    this.firstDurationMillis = 0.8 * this.durationMillis;
    this.yIncreaseSpeed = 200 * 1000 / this.firstDurationMillis;
    this.scaleIncreaseSpeed = 2 * 1000 / this.firstDurationMillis;

    this.scondDurationMillis = 0.2 * this.durationMillis;
    this.opacityDegradeSpeed = 255 * 1000 / this.scondDurationMillis;
    this.yDecreaseSpeed = 30 * 1000 / this.scondDurationMillis;
    this.xIncreaseSpeed = 20 * 1000 / this.scondDurationMillis;
  }
});

cc._RF.pop();