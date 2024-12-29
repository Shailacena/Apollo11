

export function log(...args: any[]){
    // 获取堆栈跟踪
    const stack = new Error().stack;
    console.log(stack)
    if (stack) {
        // 使用正则表达式匹配文件名
        const line2 = stack.split('\n')[1];
        const line2s = line2.split('/');
        console.log(line2s.pop(), args);
    }
}