export const LeadTable = () => {
  return (
    <>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Cliente Potencial</th>
              <th className="py-2 px-4 border">Dados Confirmados</th>
              <th className="py-2 px-4 border">Análise do Lead</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">AWS Advocacia</td>
              <td className="py-2 px-4 border"></td>
            </tr>
            <tr>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border">Ricardo Almeida Advg</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">Fernanda Soares ADV</td>
              <td className="py-2 px-4 border"></td>
              <td className="py-2 px-4 border"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
