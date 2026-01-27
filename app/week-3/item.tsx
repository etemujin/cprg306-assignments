
interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 hover:bg-gray-50 transition duration-150 ease-in-out">
      <li className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">{name}</p>
          <p className="text-md font-semibold text-blue-600">quantity: {quantity}</p>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </li>
    </div>
  );
};

export default Item;
