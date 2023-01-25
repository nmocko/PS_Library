import assert from 'assert';
import fsw from '../zadanie2.js';


describe('The fsw() method', () => {
  it('Returns /etc jest katalogiem dla /etc', () => {
    const op = fsw('/etc');
    assert.strictEqual(op, '/etc jest katalogiem');
    // expect(op.sum()).to.equal(4);
  });
  it('Returns undefine for /no', () => {
    const op = fsw('/no');
    assert.strictEqual(op, undefined);
    // expect(op.sum()).to.equal(4);
  });
  it('Returns hash for ~/hash.txt', () => {
    const op = fsw('/home/reny/hash.txt');
    assert.strictEqual(op, '/home/reny/hash.txt jest plikiem, a jego zawartością jest:\nd47d08f5d4ea8bde0bfd4e96fff25d5b6c55539d\n');
    // expect(op.sum()).to.equal(4);
  });
});