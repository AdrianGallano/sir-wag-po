import SearchInput from '@/components/search';

const HeaderSearchbar = () => {
  return (
    <div className='flex flex-col space-y-4 w-full'>
      {/* Search input */}
      <div className="relative flex-grow">
        <SearchInput />
      </div>
    </div>
  );
};

export default HeaderSearchbar;
