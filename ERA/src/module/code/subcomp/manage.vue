<template>
  <div>
    <div>
      <h3>ERA People</h3>
      <img
        :src="img1"
        alt="ERA People"
      >
    </div>
    <div>
      <h3>ERA Recruitment</h3>
      <img
        :src="img2"
        alt="ERA Recruitment"
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img1: require("../image/era_people.jpg"),
      img2: require("../image/era_recu.jpg")
    };
  },
  created() {}
};
</script>
