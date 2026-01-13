<template>
  <LandingLayout>
    <div class="landing-page">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <FooterSection />
    </div>
  </LandingLayout>
</template>

<script setup lang="ts">
import LandingLayout from "@/layouts/LandingLayout.vue";
import HeroSection from "@/components/organisms/HeroSection.vue";
import BenefitsSection from "@/components/organisms/BenefitsSection.vue";
import FeaturesSection from "@/components/organisms/FeaturesSection.vue";
import HowItWorksSection from "@/components/organisms/HowItWorksSection.vue";
import CTASection from "@/components/organisms/CTASection.vue";
import FooterSection from "@/components/organisms/FooterSection.vue";
</script>

<style scoped>
.landing-page {
  width: 100%;
  overflow-x: hidden;
}

.landing-page > * + * {
  margin-top: 0;
}
</style>
