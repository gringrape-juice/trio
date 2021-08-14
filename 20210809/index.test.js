function solution(a, b) {
    const arrA = [...a].sort().join('');
    const arrB = [...b].sort().join('');

   return arrA === arrB;
}

test('순열 관계', () => {
    expect(solution('ab', 'ba')).toBeTruthy();
});
