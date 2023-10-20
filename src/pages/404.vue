<template>
    <div>
      <!--
        element-plus 结果页
      -->
        <el-result
        icon="warning"
        title="404 提示"
        sub-title="你找的页面走丢了"
      >
        <template #extra>
          <!-- 返回首页 -->
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    </div>
</template>