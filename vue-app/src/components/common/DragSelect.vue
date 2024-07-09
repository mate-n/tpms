<template>
  <div
      id="container"
      ref="container"
      style="position: relative; user-select: none; overflow: hidden; touch-action: none;"
  >
    <slot v-bind="{ selected: intersected }"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const getDimensions = (p1: any, p2: any) => ({
  width: Math.abs(p1.x - p2.x),
  height: Math.abs(p1.y - p2.y)
});
const collisionCheck = (node1: any, node2: any) =>
    node1.left < node2.left + node2.width &&
    node1.left + node1.width > node2.left &&
    node1.top < node2.top + node2.height &&
    node1.top + node1.height > node2.top;

const props = defineProps({
  selectorName: {type: String, required: true},
  color: {type: String, required: "#4299E1"},
  opacity: {type: Number, required: 0.7},
})
const emits = defineEmits(['change'])
const intersected = ref([])
const container = ref();

watch(
    intersected,
    async (i) => {
      emits('change', i)
    },
    {
      immediate: true,
      deep: true
    }
)

onMounted(() => {
  let containerRect = container.value.getBoundingClientRect();

  const getCoords = (e: any) => ({
    x: e.clientX - containerRect.left,
    y: e.clientY - containerRect.top
  });

  let children: any = null;

  let box: any = document.createElement("div");
  box.setAttribute("data-drag-box-component", "");
  box.style.position = "absolute";
  box.style.backgroundColor = props.color;
  box.style.opacity = props.opaticy;

  let start = {x: 0, y: 0};
  let end = {x: 0, y: 0};

  const intersection = () => {
    const rect = box.getBoundingClientRect();
    const _intersected = children
        .filter((c: any) => collisionCheck(rect, c.getBoundingClientRect()))
        .map((c: any) => c.getAttribute(props.selectorName));
    if (
        _intersected.length !== intersected.value.length ||
        _intersected.some((i: any) => !intersected.value.includes(i))
    )
      intersected.value = _intersected;
  }

  const touchStart = (e: any) => {
    e.preventDefault();
    startDrag(e.touches[0]);
  }

  const touchMove = (e: any) => {
    e.preventDefault();
    drag(e.touches[0]);
  }

  const startDrag = (e: any) => {
    containerRect = container.value.getBoundingClientRect();
    children = Array.from(container.value.querySelectorAll(`[${props.selectorName}]`));
    start = getCoords(e);
    end = start;
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", touchMove);

    box.style.top = start.y + "px";
    box.style.left = start.x + "px";

    container.value.prepend(box);
    intersection();
  }

  const drag = (e: any) => {
    end = getCoords(e);
    const dimensions = getDimensions(start, end);

    if (end.x < start.x) {
      box.style.left = end.x + "px";
    }
    if (end.y < start.y) {
      box.style.top = end.y + "px";
    }
    box.style.width = dimensions.width + "px";
    box.style.height = dimensions.height + "px";

    intersection();
  }

  const endDrag = () => {
    start = {x: 0, y: 0};
    end = {x: 0, y: 0};

    box.style.width = 0;
    box.style.height = 0;

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", touchMove);
    box.remove();
  }

  container.value.addEventListener("mousedown", startDrag);
  container.value.addEventListener("touchstart", touchStart);

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
})

</script>
