<template>
  <div>
    <Offline />
    <FormAccount />
  </div>
</template>

<script>

import FormAccount from "@/components/Form/FormAccount/FormAccount";
import Offline from "@/components/Offline/Offline";
export default {
    components: {
        FormAccount,
        Offline
    }
}
</script>