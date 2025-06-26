import AgentManager from "@/components/agents/AgentManager";

const Agents = ({ agents, setAgents }) => {
  return (
    <div className="p-6">
      <AgentManager agents={agents} setAgents={setAgents} />
    </div>
  );
};

export default Agents;
