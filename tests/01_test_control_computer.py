#!/usr/bin/env python3
"""
直接测试E2B Desktop SDK的功能
绕过复杂的工具基类，直接使用SDK
"""

import asyncio
import logging
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 设置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def test_direct_sdk():
    """直接测试E2B Desktop SDK"""
    try:
        # 导入SDK
        from e2b_desktop import Sandbox
        
        logger.info("🔄 直接创建PPIO E2B Desktop沙箱...")
        
        # 直接创建沙箱
        sandbox = Sandbox(template="4imxoe43snzcxj95hvha")
        
        logger.info(f"✅ 沙箱创建成功，ID: {sandbox.sandbox_id}")
        
        # 测试获取屏幕尺寸
        logger.info("🔄 测试获取屏幕尺寸...")
        width, height = sandbox.get_screen_size()
        logger.info(f"✅ 屏幕尺寸: {width} x {height}")
        
        # 测试鼠标移动
        logger.info("🔄 测试鼠标移动...")
        sandbox.move_mouse(100, 100)
        logger.info("✅ 鼠标移动成功")
        
        # 测试获取光标位置
        logger.info("🔄 测试获取光标位置...")
        cursor_x, cursor_y = sandbox.get_cursor_position()
        logger.info(f"✅ 光标位置: ({cursor_x}, {cursor_y})")
        
        # 测试左键点击
        logger.info("🔄 测试左键点击...")
        sandbox.left_click(150, 150)
        logger.info("✅ 左键点击成功")
        
        # 测试双击
        logger.info("🔄 测试双击...")
        sandbox.double_click(200, 200)
        logger.info("✅ 双击成功")
        
        # 测试文本输入
        logger.info("🔄 测试文本输入...")
        sandbox.write("Hello from E2B Desktop SDK!")
        logger.info("✅ 文本输入成功")
        
        # 测试按键
        logger.info("🔄 测试按键...")
        sandbox.press("enter")
        logger.info("✅ 按键成功")
        
        # 测试滚动
        logger.info("🔄 测试滚动...")
        sandbox.scroll(direction="down", amount=3)
        logger.info("✅ 滚动成功")
        
        # 测试等待
        logger.info("🔄 测试等待...")
        sandbox.wait(1000)  # 等待1秒
        logger.info("✅ 等待成功")
        
        # 测试截图
        logger.info("🔄 测试截图...")
        screenshot_bytes = sandbox.screenshot(format='bytes')
        logger.info(f"✅ 截图成功，大小: {len(screenshot_bytes)} bytes")
        
        # 测试启动桌面流
        logger.info("🔄 测试桌面流...")
        sandbox.stream.start()
        vnc_url = sandbox.stream.get_url()
        logger.info(f"✅ 桌面流URL: {vnc_url}")
        
        # 测试拖拽
        logger.info("🔄 测试拖拽...")
        sandbox.drag((100, 100), (200, 200))
        logger.info("✅ 拖拽成功")
        
        # 测试应用启动
        logger.info("🔄 测试启动应用...")
        sandbox.launch("firefox")  # 尝试启动Firefox
        logger.info("✅ 应用启动成功")
        
        logger.info("🎉 所有E2B Desktop SDK功能测试完成!")
        
        # 保持沙箱运行一会儿
        logger.info("💡 沙箱将保持运行5秒，然后自动清理...")
        sandbox.wait(5000)
        
    except Exception as e:
        logger.error(f"❌ 测试过程中发生错误: {e}")
        import traceback
        logger.error(f"❌ 详细错误: {traceback.format_exc()}")
    
    finally:
        try:
            logger.info("🧹 清理沙箱...")
            sandbox.kill()
            logger.info("✅ 沙箱清理完成")
        except:
            logger.info("⚠️ 沙箱清理失败（可能已经被清理）")

if __name__ == "__main__":
    # 检查环境变量
    required_vars = ['E2B_DOMAIN', 'E2B_API_KEY', 'SANDBOX_TEMPLATE_DESKTOP']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.error(f"❌ 缺少环境变量: {missing_vars}")
        logger.error("请确保.env文件中设置了PPIO的API配置")
    else:
        asyncio.run(test_direct_sdk()) 