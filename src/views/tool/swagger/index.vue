<template>
  <i-frame :src="url" />
</template>
<script>
import iFrame from "@/components/iFrame/index";
export default {
  name: "Swagger",
  components: { iFrame },
  data() {
    return {
      //url:  "http://10.36.32.77:8080/swagger-ui/index.html"
      url: "http://localhost:8080/swagger-ui/index.html"
    };
  },
};
</script>
