
gsap.registerPlugin(ScrollTrigger);

let iteration = 0; // 当我们滚动到最后或最开始，并环绕时，播放头会被迭代 - 这使得我们可以平滑地以正确的方向继续拖动播放头。

const spacing = 0.1,    // 卡片之间的间距（错开）
  snap = gsap.utils.snap(spacing), // 我们将使用这个来使播放头在seamlessLoop上吸附。
  cards = gsap.utils.toArray('.cards li'),
  seamlessLoop = buildSeamlessLoop(cards, spacing),
  scrub = gsap.to(seamlessLoop, { // 我们可以重复使用这个补间动画，以平滑地拖动播放头在seamlessLoop上进行控制。
    totalTime: 0,
    duration: 0.5,
    ease: "power3",
    paused: true
  }),
  trigger = ScrollTrigger.create({
    start: 0,
    onUpdate(self) {
      if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
        wrapForward(self);
      } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
        wrapBackward(self);
      } else {
        scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
        scrub.invalidate().restart(); // 为了提高性能，我们只需使同一个补间动画无效并重新开始即可。不需要在每次更新时进行覆写或创建新的补间动画。
        self.wrapping = false;
      }
    },
    end: "+=3000",
    pin: ".gallery"
  });

function wrapForward(trigger) { // 当滚动触发器到达结尾时，无缝地回到开头循环播放。
  iteration++;
  trigger.wrapping = true;
  trigger.scroll(trigger.start + 1);
}

function wrapBackward(trigger) { // 当滚动触发器再次到达开始位置（以相反的方向），无缝地回到结尾循环播放。
  iteration--;
  if (iteration < 0) { // 为了防止播放头停在开头，我们可以提前跳过10次迭代。
    iteration = 9;
    seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
    scrub.pause(); // 否则，在触发器更新之前，它可能会更新总时间（totalTime），使得起始值与我们上面设置的值不同。
  }
  trigger.wrapping = true;
  trigger.scroll(trigger.end - 1);
}

function scrubTo(totalTime) { // 将滚动位置移动到与seamlessLoop的总时间（totalTime）值对应的位置，并在需要时进行包装回滚。
  let progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
  if (progress > 1) {
    wrapForward(trigger);
  } else if (progress < 0) {
    wrapBackward(trigger);
  } else {
    trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
  }
}

document.querySelector(".next").addEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));
document.querySelector(".prev").addEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));




function buildSeamlessLoop(items, spacing) {
  let overlap = Math.ceil(1 / spacing), // 为了适应无缝循环，需要在开始/结束的两侧增加额外的动画数目。
    startTime = items.length * spacing + 0.5, // 在rawSequence上开始无缝循环的时间。
    loopTime = (items.length + overlap) * spacing + 1, // 在循环回到startTime的结尾位置。
    rawSequence = gsap.timeline({paused: true}), // 这是所有“真实”动画存在的位置。
    seamlessLoop = gsap.timeline({ // 这只是将rawSequence的播放头滑动，使其看起来无缝循环。
      paused: true,
      repeat: -1, // 为了适应无限滚动/循环。
      onRepeat() { // 解决了一个非常罕见的边缘情况错误，该错误在GSAP 3.6.1中已修复。
        this._time === this._dur && (this._tTime += this._dur - 0.01);
      }
    }),
    l = items.length + overlap * 2,
    time = 0,
    i, index, item;

  // 设置项目的初始状态。
  gsap.set(items, {xPercent: 400, opacity: 0, scale: 0});

  // 现在以错开的方式循环遍历并创建所有动画。请记住，我们必须在结尾创建额外的动画来实现无缝循环。
  for (i = 0; i < l; i++) {
    index = i % items.length;
    item = items[index];
    time = i * spacing;
    rawSequence.fromTo(item, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false}, time)
               .fromTo(item, {xPercent: 400}, {xPercent: -400, duration: 1, ease: "none", immediateRender: false}, time);
    i <= items.length && seamlessLoop.add("label" + i, time); // 虽然我们并不真正需要这些，但如果你想使用标签来跳转到关键位置，我可以为你展示一下。
  }
  
  // 以下是我们设置播放头的快进来使其看起来无缝的部分代码。


  rawSequence.time(startTime);
  seamlessLoop.to(rawSequence, {
    time: loopTime,
    duration: loopTime - startTime,
    ease: "none"
  }).fromTo(rawSequence, {time: overlap * spacing + 1}, {
    time: startTime,
    duration: startTime - (overlap * spacing + 1),
    immediateRender: false,
    ease: "none"
  });
  return seamlessLoop;
}