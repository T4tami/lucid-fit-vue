<template>
    <div>
        <h1>Home Page</h1>
         <button @click="logout">登出</button>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    logout() {
      // 清除本地儲存的 token 或使用者資訊
      localStorage.removeItem('token'); // 或 sessionStorage
      // 可選：清除其他登入狀態
      // localStorage.clear();

      // 導回登入頁（假設路由名稱是 'Login'）
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>