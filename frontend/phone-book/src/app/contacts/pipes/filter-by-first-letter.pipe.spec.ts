import { FilterByFirstLetterPipe } from './filter-by-first-letter.pipe';

describe('FilterByFirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
