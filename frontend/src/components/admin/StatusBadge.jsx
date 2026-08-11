const styles = {
  pending: "bg-gold-100 text-gold-800",
  accepted: "bg-forest-100 text-forest-700",
  rejected: "bg-red-100 text-red-700",
};

const labels = {
  pending: "Pending",
  accepted: "Approved",
  rejected: "Rejected",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${
      styles[status] || styles.pending
    }`}
  >
    {labels[status] || status}
  </span>
);

export default StatusBadge;
const feesStyles = {
  unpaid: "bg-red-100 text-red-700",
  paid: "bg-forest-100 text-forest-700",
};

const feesLabels = {
  unpaid: "Fees Unpaid",
  paid: "Fees Paid",
};

export const FeesBadge = ({ feesStatus }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${
      feesStyles[feesStatus] || feesStyles.unpaid
    }`}
  >
    {feesLabels[feesStatus] || feesStatus}
  </span>
);