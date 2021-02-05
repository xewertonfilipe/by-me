<template>
<div>
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" shadow visible>
        <Profile />
        <template #footer>
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <b-button size="sm">Sair</b-button>
        </div>
        </template>
        <div class="px-3 py-2">
            <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item href="#link-1">Perfil</b-nav-item>
              <b-nav-item href="#link-2">Favoritos</b-nav-item>
            </b-nav>
          </nav>
        </div>
    </b-sidebar>
</div>

</template>

<script>
import Profile from '../Profile/Profile'
export default {
    components: {
        Profile
    }
}
</script>