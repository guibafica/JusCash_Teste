import { UseLead } from "../hooks/lead";

export const LeadTable = () => {
  const { leads } = UseLead();

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
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="py-2 px-4 border" key={lead.id}>
                  {lead.name}
                </td>
                <td className="py-2 px-4 border"></td>
                <td className="py-2 px-4 border"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
